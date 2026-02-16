import { Howl } from "howler";

import type { SoundName } from "./sounds.types";

export class Sounds {
  private static sounds: Map<SoundName, Howl> = new Map();

  public static async init(): Promise<void> {
    const promises: Promise<void>[] = [];
    if (!this.sounds.get("quack")) {
      this.sounds.set(
        "quack",
        new Howl({
          volume: 1,
          src: ["/sounds/quack.mp3"],
          loop: true,
        }),
      );
      promises.push(
        new Promise<void>((resolve) => {
          this.sounds.get("quack")?.once("load", () => {
            resolve();
          });
        }),
      );
    }
    if (!this.sounds.get("awp")) {
      this.sounds.set(
        "awp",
        new Howl({
          src: ["/sounds/awp.mp3"],
        }),
      );
      promises.push(
        new Promise<void>((resolve) => {
          this.sounds.get("awp")?.once("load", () => {
            resolve();
          });
        }),
      );
    }
    await Promise.all(promises);
  }

  public static play(name: SoundName): void {
    this.sounds.get(name)?.play();
  }

  public static stop(name: SoundName): void {
    this.sounds.get(name)?.stop();
  }
}
