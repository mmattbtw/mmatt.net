---
layout: ../../layouts/BlogLayout.astro
title: "Setting up a USB profile for Game Galaxy's ITG machine."
description: 'A full guide on how to set up a USB profile for Game Galaxy's ITG machine.'
category: "arcade"
imgUrl: "/images/gg_itg_usb/usbicon.png"
Date: 2024-8-01 00:00
---

# Before you head to the arcade:

## 1. Grab yourself a USB drive

Any size should work, just make sure its **formatted as FAT32**.
[SanDisk Cruzer 32GB on Amazon](https://www.amazon.com/gp/product/B007YX9O9E)

## 2. Download [ITGmania](https://itgmania.com)

The ITG machine runs on ITGMania (specifically ITGmania 0.6.0 and Simply Love 5.2.1), and having it on your own computer will be useful for setting up your profile before you get to the arcade. Go ahead and launch it and then close out of it just to make sure everything initializes correctly.

## 3. Edit ITGmania's default USB folder location.

Game Galaxy's machine searches for a folder on your USB drive named `StepMania 5` instead of the (new) default as `ITGmania`, so for setting up your profile we'll need to edit which folder ITGmania is looking for.

1. Open Windows Explorer and head to `C:\Users\[Your Username]\AppData\Romaing\ITGmania\Save`
2. Open `Preferences.ini` in your text editor of choice
3. Search for `MemoryCardProfileSubdir` in `Preferences.ini`
4. Edit the value after the `=` to be `StepMania 5`
   ![Screenshow showing where to edit.](/public/images/gg_itg_usb/memcard.png)

## 4. Launch ITGmania

## 5. Plug in your USB drive

You should hear a sound effect and a USB icon next to "PRESS START".
![The USB icon in ITGmania](/public/images/gg_itg_usb/usbicon.png)

## 6. Play a song

Just play any song, you can even use a rate mod to make this go faster. Unsure if this matters, but make sure to hit one note, as far as i remember that might be needed...

## 7. Quit back to the main menu

(Esc -> "Yes")

## 8. Your profile is now created! Time to configure

You should now see your newly created StepMania 5 folder, congratulations! Everything has succeeded.
![The newly created StepMania 5 folder](/public/images/gg_itg_usb/sm5folder.png)

## 9. Edit your `Editable.ini` file

Here you can put in your display name to show up in game, as well as metrics for a """more accurate""" calorie counter. (not required)
![The Editable.ini file](/public/images/gg_itg_usb/editable.png)

## 10. Add some custom songs! (not required)

If you have some files you want to play that aren't already on GG's cab, you can add some here! Just put the **song's folder** into your `/StepMania 5/Songs` folder on your USB.
**IMPORTANT: Make sure you delete any VIDEO files from your songs folder.** This may make the song too large for the limit.
![The Songs folder](/public/images/gg_itg_usb/songsfolder.png)

# At the arcade:

## Where can I plug in my USB?

The USB hub is behind the cab on P1's side. It should look something like this:
![The USB hub](/public/images/gg_itg_usb/usbhubpic.png)
