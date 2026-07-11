export const codeSample = {
  filename: 'SpawnJoker.cs',
  lang: 'csharp' as const,
  code: `using BmSDK;
using BmSDK.BmGame;
using BmSDK.BmScript;

[Script]
public class DemoScript : Script
{
    public override void OnKeyDown(Keys key)
    {
        if (key != Keys.J)
            return;

        var player = Game.GetPlayerPawn();

        // Load .upk with RCharacter_Joker
        Game.LoadPackage("FunFair");

        // Spawn Joker in front of the player
        var joker = new RPawnVillainThug(player.Location, player.Rotation);
        joker.InitCharacter(RCharacter_Joker.StaticClass());

        var dir = player.Rotation.ToDirection() with { Z = 0 };
        joker.Move(dir * 100);
    }
}`,
}
