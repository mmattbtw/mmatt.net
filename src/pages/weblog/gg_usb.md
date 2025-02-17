---
layout: "../../layouts/BlogLayout.astro"
title: "Setting up a USB profile for Game Galaxy's ITG machine."
description: "A full guide on how to set up a USB profile for Game Galaxy's ITG machine."
category: "arcade"
imgUrl: "/images/gg_itg_usb/usbicon.png"
Date: 2024-8-1 00:00
---

# Before you head to the arcade:

## 1. Grab yourself a USB drive

Any size should work, just make sure its **formatted as FAT32**.

[SanDisk Cruzer 32GB on Amazon](https://www.amazon.com/gp/product/B007YX9O9E)

## 2. Download [ITGmania](https://itgmania.com)

The ITG machine runs on ITGMania (specifically ITGmania 0.9.0 and Simply Love 5.6.0), and having it on your own computer will be useful for setting up your profile before you get to the arcade. Go ahead and launch it and then close out of it just to make sure everything initializes correctly.

## 3. Edit ITGmania's default USB folder location.

Game Galaxy's machine searches for a folder on your USB drive named `StepMania 5` instead of the (new) default as `ITGmania`, so for setting up your profile we'll need to edit which folder ITGmania is looking for.

1. Open Windows Explorer and head to `C:\Users\[Your Username]\AppData\Romaing\ITGmania\Save`
2. Open `Preferences.ini` in your text editor of choice
3. Search for `MemoryCardProfileSubdir` in `Preferences.ini`
4. Edit the value after the `=` to be `StepMania 5`
   ![Screenshow showing where to edit.](/images/gg_itg_usb/memcard.png)

## 4. Launch ITGmania

## 5. Plug in your USB drive

You should hear a sound effect and a USB icon next to "PRESS START".
![The USB icon in ITGmania](/images/gg_itg_usb/usbicon.png)

## 6. Play a song

Just play any song, you can even use a rate mod to make this go faster. Unsure if this matters, but make sure to hit one note, as far as i remember that might be needed...

## 7. Quit back to the main menu

(Esc -> "Yes")

## 8. Your profile is now created! Time to configure

You should now see your newly created StepMania 5 folder, congratulations! Everything has succeeded.
![The newly created StepMania 5 folder](/images/gg_itg_usb/sm5folder.png)

## 9. Edit your `Editable.ini` file

Here you can put in your display name to show up in game, as well as metrics for a """more accurate""" calorie counter. (not required)
![The Editable.ini file](/images/gg_itg_usb/editable.png)

## 10. Add some custom songs! (not required)

If you have some files you want to play that aren't already on GG's cab, you can add some here! Just put the **song's folder** into your `/StepMania 5/Songs` folder on your USB.

**IMPORTANT: Make sure you delete any VIDEO files from your songs folder.** This may make the song too large for the limit.
![The Songs folder](/images/gg_itg_usb/songsfolder.png)

## 11. Let's setup GrooveStats!

GrooveStats is an online score submission service (similar to e-amusement) that enables you to upload your scores and participate in events!

### 11.1: Sign up for GrooveStats

You can sign up for GrooveStats at [GrooveStats.com](https://groovestats.com)

![The Register button is under the Login Forum at the top of the GrooveStats homepage](/images/gg_itg_usb/gsregister1.png)

![Here you input all of your super secret information to make an account.](/images/gg_itg_usb/gsregister2.png)

### 11.2: Grab your GrooveStats API key

After signing in, you can find your GrooveStats API key under "Edit Profile". On the third line you'll find the entry for API key, if you don't have one already go ahead and click Generate, and then Copy to your clipboard.

![The Edit Profile button is under Profile Options in the GrooveStats header.](/images/gg_itg_usb/gsapi1.png)

![The API key section is the third line on under Update Profile.](/images/gg_itg_usb/gsapi2.png)

### 11.3: GrooveStats on your USB!

Make a new file on your USB drive called `GrooveStats.ini`. In this file, use the following template:

```ini
[GrooveStats]
ApiKey=Replace_After_The_Equal_Sign_With_The_API_Key_You_Got_From_GrooveStats
IsPadPlayer=1
```

![GrooveStats.ini contains a line that says "[GrooveStats]", the next line starts with "ApiKey=" with a space to put your GrooveStats API key, and the last line in the file says "IsPadPlayer=1" which is required for uploading scores.](/images/gg_itg_usb/gsini.png)

### 11.4: All Done!

Your scores will now be automatically uploaded to GrooveStats! You'll be able to see a leaderboard in the evalutaion screen by hitting the Left (<) or Right (>) controls under the screen.

With events like ITL Online, you'll be able to earn Points and unlock Titles & Charts to play! Just sign into their respective website to register (for example: ITL Online 2024 is over at [itl2024.groovestats.com](https://itl2024.groovestats.com/) and you can view all the current events on the left side of the GrooveStats homepage) and begin playing!

# At the arcade:

## Where can I plug in my USB?

The USB hub is velcroed to P1's side of the cab. Top slot is P1, bottom slot is P2. It should look something like this:
![The USB hub](/images/gg_itg_usb/usbhubpic.png)
