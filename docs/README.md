# Weemo JavaScript API


In this repository, you will find, wiki pages describing how to implement Weemo Video in web applications.

- [Getting Started](start.md)
- [Quick-start WeemoDriver and WebRTC](quickstart.md)
- [Integration WeemoDriver and WebRTC](integration.md)
- [Definitions](naming.md)
- [Sample Code](https://github.com/weemo/Weemo.js/tree/master/examples)
- [Upgrade from 4.2 to 5.1](upgrade42.md)
- [Weemo Driver User Guide](userguide.md)

For a full JavaScript API reference plese refer to our official documentation website : [http://docs.weemo.com/beta](http://docs.weemo.com/beta)


## System Requirements

| | Minimum Hardware| Recommended Hardware| Operating Systems| Speakers & Mic| Webcam|
|---|---|---|---|---|---|
| **Windows**| Intel Core 2 Duo or AMD Athlon X2 1GB of RAM| Intel Core i5 3470 or AMD A8 6K series with 2GB of RAM| Windows XP SP3, Windows 7 & 8, 8.1| Any built-in or standalone|Any built-in or standalone, 720p camera recommended|
| **Mac**| Intel Core 2 Duo 1 GB RAM| Intel Core i5 3470 2GB RAM| Mac OS 10.6 to 10.9.x| Any built-in or standalone|Any built-in or standalone, 720p camera recommended|
| **Android**| Any ARM-based phone or tablet| Late Model Year ARM-based device |Android 4.0.3 or later| Headphones recommended| Front or back device camera|
| **Apple**| iPhone 4s, iPad 2| iPhone 5, iPad 2+| iOS 5.1 or later| Built-in or Headphones| Front or back device camera|


## Browser Compatibility Matrix

| Weemo Client | Browser | Operating Systems |
|---|---|---|
| WeemoDriver for Windows | IE 8, 9, 10, 11; Firefox 25 or later; Chrome 30 or later | Windows 8.1, 8, 7, XP SP3 |
| WeemoDriver for Mac OS X | Safari 5  or later; Firefox 24 or later; Chrome 30 or later | Mac OS 10.9, 10.8, 10.7, 10.6 |
| Weemo WebRTC | Chrome 30 or later | Windows; Mac OS X; Android; Linux |


## Network 
#### Requirements
LAN, WLAN, Broadband, 3G, 4G/LTE

#### Minimum Bandwidth Required per Stream (Audio + Video)

| | | 180p | 360p | 720p |
|---|---|---|---|---|
| **Video Size** | **Audio Only** | **Thumbnail** | **Mid Size** | **Full Screen** |
| 1:1 HD Resolution | **0x0** | **320x180** | **640x360** | **1280x720** |
| 1:1 HD Quality | 30 Kbps | 130 Kbps | 280 Kbps | 560 Kbps |
| 1:1 SD Resolution | 0x0 | 160x90 | 320x180 | 640x360 |
| 1:1 SD Quality | 30 Kbps | 80 Kbps | 130 Kbps | 280 Kbps |
| **Multi-Party** | | | | |
| Conf Active Spkr HD | 30 Kbps | 280 Kbps | 280 Kbps | 280 Kbps |
| Conf Active Spkr SD | 30 Kbps | 180 Kbps | 180 Kbps | 180 Kbps |
| Conf Add'l Passive Spkr* |  0 Kbps | +40 Kbps | +40 Kbps | +40 Kbps |
| **Screen Sharing** | | | | |
| Resolution | **1600x900** | **1600x900** | **1600x900** | **1600x900** |
| Add'l Bandwidth | +20 Kbps | +20 Kbps | +20 Kbps | +20 Kbps |

(*) Note: Video conferences support the display of 4 passive speakers. Additional attendees can join conferences beyond the Active Speaker and on-screen Passive Speakers.


## About Weemo

The Weemo Video Cloud is a solution specifically targeted at application software vendors providing real-time video communications embedded within any web or mobile application. The solution is particularly well suited for business software applications such as Enterprise Social Networks, CRM, HCM, Customer Service, eHealth, Education and E-learning, as well as for Contact Management and Collaboration.

Weemo relies on standard protocols and open source technologies to deliver a carrier class service. The solution provides constant interoperability with existing or future communication-oriented devices and network infrastructures.

Weemo provides both the client technology and integration means and a worldwide cloud infrastructure. These building blocks are designed to work together as one easy-to-use solution. The application vendor, provider of the web application to be integrated with Weemo, will integrate this SDK to his application to allow audio and video communication.

Learn more about Weemo at <a href="http://www.weemo.com">Weemo.com</a>.
