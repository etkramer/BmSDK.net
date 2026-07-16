---
title: Extending classes with Script Components
description: Add custom, attachable behavior to existing in-game classes using BmSDK's ScriptComponent API.
---

In script modding, you often want to extend existing in-game classes. You can do this using BmSDK's `ScriptComponent` API. These are similar to the game's built-in ActorComponents but allow for scripts to add their own custom behavior. Those work very similarly to actually "dynamically" extending the UClasses. It's important to note that only one instance of a given ScriptComponent type may be attached to the same Actor object. The workflow is as follows: You extend ScriptComponent, add code to the dedicated entry points, declare ComponentRedirects, and then attach the components to Actor object's you want to modify.

## Step 1: Extending ScriptComponent

Before we can attach a script component, we must write it first. This is done by creating a class which extends `ScriptComponent` and has the `ScriptComponentAttribute`:

```csharp
[ScriptComponent]
public class ExampleComponent : ScriptComponent<RPawnPlayer>
{

}
```

The generic type argument `RPawnPlayer` specifies the Actor type which the ScriptComponent applies to. In this case any object that is either an RPawnPlayer or a child of it will be able to use the ScriptComponent. If you want the ScriptComponent to attach to all Actors, use `Actor` as the type argument. This is extremely useful because ScriptComponent exposes the `Owner` property that is automatically casted to the given type. Thus, you can easily access the Actor a ScriptComponent instance is attached to.

## Step 2: Using the entry points

The ScriptComponent class provides three useful entry points: `OnAttach()` is run when the component is applied to an Actor. `Tick()` is run once each frame. Finally, `OnDetach()` is called before the script component is unhooked. You may optionally override them; otherwise, nothing is done at those events:

```csharp
// Inside of the ScriptComponent definition...
public override void OnAttach() => Debug.Log("ExampleComponent attached");

public override void OnDetach() => Debug.Log("ExampleComponent detached");
```

## Step 3: Overriding in-game methods

Continuing on with the theme of extending UClasses: You may override functions of the ScriptComponent target type using ComponentRedirects. They are local redirects meaning they only apply to Actors with the specific ScriptComponent attached (see [Redirecting functions](/docs/guides/redirecting-functions/)). This is an example that reduces XP health regeneration:

```csharp
// Still inside of the ScriptComponent definition...
[ComponentRedirect(nameof(RPawnPlayer.ExperienceAwarded))]
void ExperienceAwardedRedirect(int xp, int teethXp)
{
    Debug.Log("Experiencing less...");
    Owner.ExperienceAwarded(xp / 10, teethXp / 10);
}
```

The following must be done for a ComponentRedirect to be valid: The method must be annotated with the `ComponentRedirectAttribute`. Do NOT use `RedirectAttribute`. As opposed to global redirects, the target type is inferred from the ScriptComponent's target type and must be omitted. The target UFunction must be an instance method (can't be static). Keep the original return type, parameter types, and parameter order. Method name, parameter names, and access modifier do not matter. Another big difference to global redirects is the fact that local ones do **NOT** have an _artificial self argument_. To access the object on which the method is called on, use `ScriptComponent.Owner`.

## Step 4: Attaching the ScriptComponent

There are two ways to attach a ScriptComponent: You may apply the component manually. Alternatively, you can let BmSDK attach it automatically to any object of the target type and optionally its children on spawn (right before `PostBeginPlay()`). The latter is done by setting the `AutoAttach` and `AllowSubtypes` properties of `ScriptComponentAttribute`. AutoAttach defaults to false and AllowSubtypes defaults to true although it doesn't take effect if AutoAttach is disabled:

```csharp
[ScriptComponent(AutoAttach = true, AllowSubtypes = false)]
// ScriptComponent declaration...
```

Note that this can kill performance if the component targets a very common type (like `Actor` itself) while also doing heavy operations.

To manually work with ScriptComponents, you can use `HasScriptComponent()`, `AttachScriptComponent()`, `GetScriptComponent()`, and `DetachScriptComponent()` on Actor. It's recommended to use the generic functions. For example:

```csharp
// Toggle ExampleComponent
if (actor.HasScriptComponent<ExampleComponent>())
{
    actor.DetachScriptComponent<ExampleComponent>();
}
else
{
    actor.AttachScriptComponent<ExampleComponent>();
}
```
