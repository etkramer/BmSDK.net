---
title: Redirecting functions
description: Use BmSDK's redirect API to detour in-game UFunctions and override built-in behavior.
---

In script modding, you often want to **override in-game behavior** rather than add code at specific entry points. This is what BmSDK's redirect API is for. It allows scripts to detour UFunctions, add custom behavior, and optionally call the base implementation.

We differentiate between two types of redirects: **global** and **local** (sometimes called conditional). Global redirects apply globally and unconditionally to _specific in-game types and all of their objects_. Consequently, only they can be used to detour static UFunctions (though, they also support instance methods). Local redirects are _specific to a ScriptComponent_. If a UFunction is called on an Actor with that particular component, the detour will apply; otherwise, the default behavior will run.

You may declare multiple redirects to the same function in which case the redirectors will be queued: When the first redirect calls the base implementation, the second will be executed and so on until there are none left. Then, the vanilla function is run. If one of the redirects doesn't call the base implementation, the chain is broken and the remaining redirects won't be called. The local detours are run first, then the global ones.

## Global redirectors

You can define global redirects using the `RedirectAttribute`. BmSDK manages the registration on start up and script reload for you.
This is an example of a global redirect through RedirectAttribute:

```csharp
class SomeClass
{
    // The function must be static
    [Redirect(typeof(RGameRI), nameof(RGameRI.GetDifficulty))]
    static int GetDifficultyRedirect(RGameRI self)
    {
        if (Game.GetGameInfo().bStoryDLC)
        {
            return (int)RPersistentOptions.DifficultyLevels.Difficulty_Hard;
        }

        return self.GetDifficulty();
    }
}
```

This function overrides the internal mechanism for determining the difficulty. Usually the game hard-codes the difficulty of the Harley Quinn's Revenge DLC to Normal. The redirect, however, checks if the game is in the PDLC (`RGameInfo.bStoryDLC`) in which case it returns the Hard difficulty. Otherwise, the default implementation takes over.

RedirectAttributes are always registered as early as possible during game start up. The syntax of the detour function must follow these rules: Keep the original return type, parameter types, and parameter order. Function name, parameter names, and access modifier do not matter. If the target function is an instance method (non-static), BmSDK supplies the artificial self argument as the first parameter; it's the instance the function is called on. Your function must be static.
Putting all this together, let's look at `RGameRI.GetDifficulty()` in more detail. It's function signature looks like this:

```uc
final event int GetDifficulty()
```

`final` means that no child class overrides this function and `event` changes the way the function is called internally but is not important for redirects. The important thing is that the function is not static, returns `int`, and has no parameters. This is the signature of the global redirect with the least amount of keywords:

```csharp
static int GetDifficultyRedirect(RGameRI self)
```

We also return `int` but have one parameter which is the `RGameRI` object itself. If the target function were static, we wouldn't need it.

## Local redirectors

Local redirects are part of the ScriptComponent-API. Script components are functionally very similar to extending the target class which in turn means that local redirects are like overriding methods of the parent class. They work through the `ComponentRedirectAttribute` which should NOT be confused with ~~`RedirectAttribute`~~. How they work in detail is explained in the [ScriptComponent tutorial](/docs/guides/script-components/).
