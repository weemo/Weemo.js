## WeemoDriver integration sample files

You can find here some samples to how-to make calls with WeemoDriver 4.x

- <a href="https://github.com/weemo/Release-4.x/blob/WeemoDriver/examples/tiny_sample.html">timy_sample.html</a>: This file was created to support our <a href="https://github.com/weemo/Release-4.x/wiki/Javascript-API---Quick-start">Quick Start tutorial</a>. It connects you as <font color="#995555">"user_id"</font> UID and launches a call as a host of a conference.<br>
- <a href="https://github.com/weemo/Release-4.x/blob/WeemoDriver/examples/callee.html">callee.html</a>: This sample connects a user <font color="#995555">"source_uid"</font> who is calling after authentication <font color="#995555">"destination_uid"</font> user.<br>
- <a href="https://github.com/weemo/Release-4.x/blob/WeemoDriver/examples/caller.html">caller.html</a>: This sample connects a user as <font color="#995555">"destination_uid"</font> UID who is waiting for a call.<br/> 
- <a href="https://github.com/weemo/Release-4.x/blob/WeemoDriver/examples/hostconference.html">hostconference.html</a> This sample connects you as UID you have chosen and launch a conference as host.


All those files must be edited with yours:

- <font color="#995555">APP_ID</font>: Application Identifier (API key) provided by Weemo.
- <font color="#995555">YOUR_UID</font>: Unique identifier to identify your session in Weemo Allocation DataBase.
- <font color="#995555">YOUR_DISPLAY_NAME</font>: The Displayname to display to other participant. This information is only informative.

To understand methods used in these exemples, please read our JavaScript reference: <a href="http://docs.weemo.com/js/index.html"> docs.weemo.com/js/</a>

