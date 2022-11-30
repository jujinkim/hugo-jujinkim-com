---
title: "My Ubuntu Desktop Setup"
date: 2022-11-30T18:20:54+09:00
draft: false
---

## My Ubuntu Desktop Setup & TroubleShoots
---
For Dell XPS 13 9310  

&nbsp;
## Install fingerprint driver
---
Dell XPS 13 uses Goodix fingerprinter. 
[Download](http://dell.archive.canonical.com/updates/pool/public/libf/libfprint-2-tod1-goodix/) driver and install.

Or do it manually:  
1. Download via wget
> $ wget -O ~/Downloads http://dell.archive.canonical.com/updates/pool/public/libf/libfprint-2-tod1-goodix/libfprint-2-tod1-goodix_0.0.6-0ubuntu1~somerville1_amd64.deb
2. Install via dpkg
> $ sudo dpkg -i libfprint-2-tod1-goodix_0.0.6-0ubuntu1~somerville1_amd64.deb
3. Reboot
4. Enroll
> $ fprintd-enroll
5. Configure from system setting.

&nbsp;
## Make Wi-Fi Stable
---
Edit power save setting file
>/etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
```
[connection]
wifi.powersave = 3  # <-- Edit to 2
```

Restart service
> $ systemctl restart NetworkManager

&nbsp;
## Battery optimize
---
Install tlp
> $ sudo apt tlp tlp-rdw

Check tlp
> $ tlp-stat -s

&nbsp;
## Gnome tweak and extensions
---
> $ sudo apt install gnome-tweak

> $ sudo apt install extension-manager

* runcat
* burn my windows
* compiz windows effect
* clipboard indicator
* always show workspace thumbnails
* gesture improvements
* gsconnect (Turn off 'phone->pc notification shareing')

&nbsp;
## WineHq KakaoTalk Korean issue
---
### Korean input issue at iBus
1. Edit wine registry ([Useful registry keys](https://wiki.winehq.org/Useful_Registry_Keys))
> $ wine reg add "HKEY_CURRENT_USER\Software\Wine\X11 Driver" /v InputStyle /t REG_SZ /d root /f

2. Edit KakaoTalk start-up command  
> ~/Desktop/카카오톡.desktop

> ~/.local/share/applications/wine/Programs/카카오톡/카카오톡.desktop
Add `LANG="ko_KR.UTF-8"` to `Exec`, before `wine-stable`


&nbsp;
### Korean font print issue
1. Download [Gulim TTF](https://www.google.com/search?q=gulim+ttf&oq=gulim+ttf) fonts, and move them to 
> ~/.wine/drive_c/windows/Fonts

And make fonts' permission to `664` or over.

2. Edit system.reg file
> ~/.wine/system.reg
```
...
"MS Shell Dlg"="Tahoma"     # <-- "Gulim"
"MS Shell Dlg 2"="Tahoma"   # <-- "Gulim"
...
```

&nbsp;
## Audio controller software
---
(When the sound is played to the unexpected device)  
Install PulseAudio controller, and choose the proper device
> $ sudo apt install pavucontrol

&nbsp;
## Install zsh & Oh My Zsh
---
 [zsh Installation Link](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH) or install via `apt`
> $ sudo apt install zsh

And then, install [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)