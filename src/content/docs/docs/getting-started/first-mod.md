---
title: Creating your first mod
description: Set up a BmSDK project, create your first script file, and add basic gameplay logic step by step.
---

This guide walks you through setting up your BmSDK project, creating your first script file, and adding basic gameplay logic step by step. You will also learn about some of the most important API calls. Lastly, we'll give you some resources to deepen your knowledge.

## Requirements

This tutorial expects you to have the [latest BmSDK version](https://github.com/etkramer/BmSDK/releases/latest). We also assume that your development environment is already set up. If you haven't done that yet, follow the guide posted on the [README](https://github.com/etkramer/BmSDK?tab=readme-ov-file#%EF%B8%8F-setting-up-for-mod-development). Also having some basic understanding of C#, Java or any other similar language would be helpful but isn't necessary.

## Step 1: Creating the first source file

All source files go into `%GameDir%\BmGame\Scripts` and its sub-directories. That's because BmSDK will look there and compile the scripts for you when booting up the game. We advise you to create a folder under `Scripts` for each of your larger projects or at least one for your works. This has several advantages:

1. Helps compartmentalize and structure your code
2. Creating a Git repo for your projects is then easier
3. Simplifies the management of multiple mods by different creators

Next, all the actual source files **must end** with `.cs`. It is recommended to name the "main" file in a way that advertises it as an entry point clearly. Something like "[ProjectName]Script.cs" works well. For this tutorial you can also just use the `MinimalScript.cs` that comes with BmSDK.

## Step 2: Writing the main file

For your script to be registered by BmSDK you must define a specific structure in your main code file. It goes like this:

```csharp
using BmSDK;

namespace Example;  // optional but recommended

[Script]
public class ExampleScript : Script
{
    // Main() is optional
    public override void Main()
    {
        Debug.Log("Hello world!");
    }
}
```

The first line imports BmSDK into the current file. You shouldn't worry about it too much because Visual Studio does that automatically for you. The namespace definition is there to prevent naming collision between mods but is not strictly necessary.

`[Script]` is an attribute applied to the class that follows. The attribute adds metadata, so BmSDK can recognize the script. Then comes the class definition. It's name should be the same as the source file's.

`: Script` indicates that we inherit from BmSDK's template `Script` class. This is necessary so that the script can be loaded in. Moreover, this gives us access to many useful methods that allow us to run code at specific events during gameplay. One of those methods is `Main()` which is run once when the Engine first becomes ready. The other events/entry points are defined in [Script.cs](https://github.com/etkramer/BmSDK/blob/main/src/BmSDK/Framework/Script.cs) with inline documentation explaining their features.

Finally, with `Debug.Log()` we are able to print messages to the output buffer.

This is quite a lot of input, however **all of this boilerplate code has to be written only once per project**. The Main() method could be omitted too.

## Step 3: Adding logic to your script

Now that we've registered our script we can write code. This is an example that uses quite a few parts of the API:

```csharp
// This is inside the class
public override void OnKeyDown(Keys key)
{
    switch (key)
    {
        case Keys.J:
            // Get the pawn that the player is possesing (Batman)
            var rpp = Game.GetPlayerPawn();

            // Load package we need for RCharacter_Joker
            Game.LoadPackage("FunFair");

            // Spawn in a pawn
            var enemy = Game.SpawnCharacter<RPawnVillainThug, RCharacter_Joker>(rpp.Location, rpp.Rotation);

            // Now we can call methods on the created Pawn
            enemy.bArmoured = true;
            break;
    }
}
```

`OnKeyDown()` is called when any key is pressed so we should use a switch statement to filter for specific keys.

`Game.GetPlayerPawn()` retrieves the `RPawnPlayer` in the game world that is controlled by the player. That object is useful for setting player health, and doing things on Batman's location among other things. This is contrasted by `RPlayerController` which represents the player. You can get the instance using `Game.GetPlayerController()`. A good way to understand the difference is that the controller's location is the camera's location behind Batman -- that's where you sit! The `RPlayerController` basically implements the methods for moving the Pawn.

Then we load the package "Funfair". We must do this because not all assets are available everywhere. If we didn't have this line, the game would crash everywhere except the Joker fight right before Protocol 10 starts. The available packages are in `%GameDir%\BmGame\CookedPCConsole`. They can be explored using [UPK Explorer](https://www.nexusmods.com/site/mods/587). The argument for `Game.LoadPackages()` should be just the name of the package without the ".upk" ending or a path.

Next we spawn Joker using `Game.SpawnCharacter()`. The first type it expects is a class that inherits `RBMPawnAI`. This defines the behavior of the character. The second type must be an `RCharacter`. Characters are predefined people you can spawn: Joker, Harley, Azrael etc. They define the appearance of the Pawn.

Lastly, I just set a property in the newly created Pawn to give them armor.

## Step 4: Test your mod

Press **F5** in Visual Studio to launch the game and test your mod. After the game launches, you should see the log message in the bottom right panel in the IDE. If you enter the story mode and press J, a Joker should spawn at Batman's location.

## The End?

There is still a lot to learn about the BmSDK. The [Game utility class](https://github.com/etkramer/BmSDK/blob/main/src/BmSDK/Framework/Game.cs) is a good overview of BmSDK's capabilities. There are also usage examples in the [DemoScript.cs](https://github.com/etkramer/BmSDK/blob/main/bin/BmGame/Scripts/DemoScript.cs). [IceMage's Chaos Mod](https://github.com/TheIceMage/BatmanAC-CHAOS) is also a good resource to see all of the shenanigans that are possible. However, most of the workflow is throwing things at the wall and seeing what sticks. That's because many of the game internal methods don't work or have side effects. [UE Explorer](https://github.com/UE-Explorer/UE-Explorer) is an important tool to understanding the game's quirks. You can also join the [Arkham Workshop](https://discord.com/invite/arkhamworkshop) to discuss the BmSDK and ask for help.
