using System.Text.Json;

namespace Paraline.AudioBridge;

internal static class Program
{
    private static async Task Main()
    {
        Console.Error.WriteLine("Audio bridge scaffold started.");
        Console.Error.WriteLine("TODO: replace fake values with Windows loopback capture.");

        while (true)
        {
            var value = 0.12 + (Math.Sin(DateTime.UtcNow.TimeOfDay.TotalSeconds * 0.4) + 1.0) * 0.08;

            var payload = JsonSerializer.Serialize(new
            {
                type = "level",
                value
            });

            Console.WriteLine(payload);
            await Task.Delay(33);
        }
    }
}
