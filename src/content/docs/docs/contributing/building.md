---
title: Building from source
description: Understand the BmSDK architecture and build it from source to create nightly builds and contribute.
---

This tutorial will briefly explain the architecture of BmSDK and show you how to build it from source. That way you will be able to create the latest nightly build and contribute to this repository.

## Prerequisites

You will need a vanilla build of the game. BmSDK was developed for the Epic Games Store version which has a different executable and some other small differences to the other builds. Prefer getting the game files from the EGS if you can. Otherwise, apply the [SteamPatch](https://github.com/etkramer/BmSDK?tab=readme-ov-file#%EF%B8%8F-notice-for-non-epic-games-store-users) to the installation you want to use.

Similar to developing mods with BmSDK, you will need [Visual Studio 2026](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Stable) to import the solution. In the Visual Studio Installer you will need to install following _Workloads_:

- **.NET Desktop development**
- **Desktop development with C++**

## Step 1: Getting the source code

You can get the sources by cloning the repo (or your fork): `git clone https://github.com/etkramer/BmSDK.git`. If you don't want to use Git, get the [ZIP file](https://github.com/etkramer/BmSDK/archive/refs/heads/main.zip) from GitHub and extract it in you target development folder.

## Step 2: Importing the game into the solution

Just copy the contents of your game's installation folder (e.g. `C:\Program Files\Epic Games\BatmanArkhamCity\*`) into the `bin` directory of the repo. That folder should now contain entries like "Binaries" and "Engine". You should then also copy the [Ultimate ASI Loader dinput8.dll](https://github.com/ThirteenAG/Ultimate-ASI-Loader/releases/download/Win32-latest/dinput8-Win32.zip) into `bin\Binaries\Win32`.

## Step 3: Load solution into Visual Studio

Start Visual Studio and open the solution at the root of the repo called `BmSDK.slnx`. Now you might have to open a command prompt (**View -> Terminal**) and run `vcpkg integrate install`. If dependencies in the "BmSDK" C# project can't be resolved, you might have to set up NuGet: `dotnet nuget add source "https://api.nuget.org/v3/index.json" --name "nuget.org"`. Now we are able to start building.

## Step 4: Generating the SDK

The BmSDK repo consists of three main projects: BmSDK.Generator, BmSDK.Host and BmSDK. The generator hooks into the game through DLL injection using Ultimate ASI Loader. Then, it loads in all the UPKs containing code. Finally, the program generates ".cs" files in `src\BmSDK\Generated` based on the memory layout of the UObjects—mapping properties and methods to C# representations. Because the created SDK is huge and deterministically generated, it is not provided in the repo (.gitignore). Therefore, you must generate it once first before building BmSDK itself. You should already have installed the ASI Loader in [step 2](#step-2-importing-the-game-into-the-solution). Now you only have to right click the `BmSDK.Generator` project and click "Build". After the compilation has finished, execute `bin\Binaries\Win32\BatmanAC.exe` and wait for the game to start up properly. Then, press "P" while the window is focused and let the game close itself automatically after a while. Done! This only has to be done once until the Generator gets updated.

## Step 5: Bulding BmSDK.Host

BmSDK.Host is similar to Generator in the fact that it is loaded in as a plugin by Ultimate ASI Loader. However, instead of generating an SDK, it loads in the .NET Runtime and `BmSDK.dll`. Make sure to remove the generator now (`bin\Binaries\Win32\plugins\BmGame.Generator.*`). Right click the `BmSDK.Host` project and build it.

## Step 6: Building BmSDK.dll

Lastly, `BmSDK.dll` has to be created. That's the centerpiece of BmSDK that runs alongside the game: It hooks into Unreal Engine 3's event loop, compiles and executes scripts, contains C# representations of the game's internal data structures and provides APIs to facilitate the interaction with the game. Compile it by right clicking the `BmSDK` project and selecting "Build".

## Conclusion

After all these steps you should now have built the entirety of BmSDK from source. The generated files used in a full release are spread out over multiple directories:

- Ultimate ASI Loader: `bin\Binaries\Win32\dinput8.dll`
- BmSDK.Host: `bin\Binaries\Win32\plugins`
- BmSDK: `bin\Binaries\Win32\sdk`
- Script development environment: `bin\BmGame\ScriptsDev`
- Scripts directory with example: `bin\BmGame\Scripts`

You can create a release build by running the `Build.ps1` script.
