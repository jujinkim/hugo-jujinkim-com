---
title: "Solutions to fix BattleField 2042 bugs that make unable to play"
date: 2022-12-21T14:01:12+09:00
draft: false
---

Recently I noticed that there were some bugs and glitches in BattleField 2042, and these make the game unable to be played.

Here are troubleshooting solutions that I found or learned.

&nbsp;
## Seems like no one in the server
---
This issue makes the game not able to be matched, or take long time to match the game. Even the game has begun, stuck at "1/32 to begin the game" screen and never started.
```
If you have turned off "Allow cross-platform matching" in the Game setting, turn it on.
```

&nbsp;
## The game client is shutting down suddenly while playing game
---
This problem is occured while playing the game, within 3 minutes after I entered the game. Not happened in the lobby or loading screen.  
I'd faced this issue after overclock RAMs. So I'd thought that there was something wrong between overclocked RAM and BF2042. After make them back to normal, this issue has gone.
```
If your RAMs are overclocked, make them back to normal.
```

&nbsp;
## My character's movement looks like slow-mo
---
In this situation, you may feel like there are lags in the game, but something different between other games' lags. It's like every other people are playing normally, but only my character moves extremely slow. like the slow-motion effect is applied to only my character. And, this happens only in the battle field. 

If you are having in trouble with this issue, you need to check the network status. There are some options to display the network status widget in the BF game setting. `(Options > General > Network)`  
Turn the setting "`Show network performance bar`" on. After this, go into the game again, and you may notice that there is a long bar at the top of the screen. Find `TN` and read the value. `TN` means `Time Nudge`.  

 If `TN` value is too high (>100ms, sometimes >1k), I recommend you to adjust some of your PC settings. You don't have to do these all. Try these one by one until the problem is fixed.
```
Update your BIOS, and disable TPM

I don't know the reason, but the "TPM" makes BF2042 performance shit.
Just turning off TPM setting in BIOS setting, it would decrease BF2042 lag.
If you cannot find TPM disable in BIOS setting, you should update the BIOS from the manufactor's website.

My PC's CPU is Ryzen 1700x, and this method helps the game run perfectly.
```
```
Make sure that every parts of your PC work properly.

For example, If your PC has 8GBx2 RAMs, check your system recognizes 16GB RAM.
If one RAM is not working, your system only has 8GB RAM, and 8GB is not enough to run BF2042.
```
```
Make QoS reservable bandwidth unlimited

1. Run 'gpedit.msc'. (Win+R > Type 'gpedit.msc' > Enter)
2. Navigate below:
  Computer Configuration
     Administrative Templates
       Network
         QoS packet scheduler
3. Double click 'Limit reservable bandwidth'.
4. Check "Enabled", and set "Bandwidth limit (%)" value to 0.
5. Click "OK" to close dialog, and reboot your PC.
```

```
Turn the setting "Delivery optimization" off (Windows 10)

1. Enter the control panel.
2. Navigate 'Update & Security > Delivery Optimization'
3. Turn it off.
```
```
Set the core's count and thread's count for BF2042

1. Go to the directory where BF2042 is installed.
2. Create 'user.cfg' file.
3. Add below:

Thread.ProcessorCount [CPU core count]
Thread.MaxProcessorCount [CPU thread(processor) count - 2]
Thread.MinFreeProcessorCount 0
Thread.JobThreadPriority 0
GstRender.Thread.MaxProcessorCount [CPU thread(processor) count]

e.g) 8 Core with HT(16 threads)
Thread.ProcessorCount 8
Thread.MaxProcessorCount 14
Thread.MinFreeProcessorCount 0
Thread.JobThreadPriority 0
GstRender.Thread.MaxProcessorCount 16

4. Save user.cfg and run BF2042.
```
```
Optimize PC using optimizing apps
```
> Above setting cannot fix this problem perfectly, but some may help to make network performance improved.

&nbsp;
## Everything is perfect but I cannot shoot enemies
---
It is definitely your hands' problem. 
```
Concentrate and practice more.
```

---
&nbsp;

I still think that the BF series is one of the best FPS game series, but BF 2042 contains too many bugs. I hope that no more bugs or gliches are happened in this game anymore.