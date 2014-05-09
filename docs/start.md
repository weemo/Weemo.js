# Getting Started

## Overview

For each of the real-time client that Weemo supports, an associated SDK 'helper' or JavaScript API 'example' program is made  available.  The helper programs are designed to illustrate how to initialize a Weemo session and how to create or receive a one-to-one call.

The helper programs and examples are distributed as projects that compile, build or run with little (or no) modification.  A successful run of one of these projects shows that a developer has installed all of the tools necessary to begin developing with Weemo.

The real-time client and the names of their associated helper applications
appear below.

##### SDK Helpers:
- [iOS - sdk_helper](https://github.com/weemo/iOS-SDK_beta)
- [Android - sdk_helper](https://github.com/weemo/Android-SDK_beta)
- [Phonegap - sdk_helper](https://github.com/weemo/Phonegap-SDK_Beta)

##### JavaScript API examples:
- [Javascript API - examples](https://github.com/weemo/Weemo.js_beta/tree/master/examples)

## Content
- [Background](#background)
    - [Weemo Application Identifier (AppID)](#weemo-application-identifier-appid)
    - [User Identifier (UID)](#user-identifier-uid)
    - [Weemo Display Name](#weemo-display-name)
    - [POC (Proof-of-Concept) Mode](#poc--proof-of-concept-mode)
    - [Weemo Type](#weemo-type)
    -[Weemo Call Type](#weemo-call-type
)
- [Make a call using a Weemo real-time clients](#make-a-call-using-a-weemo-real-time-client)
- [Make a call between different Weemo real-time clients](#make-a-call-between-different-weemo-real-time-clients)

## Background

##### Weemo Application Identifier (AppID)
   
A Weemo AppID identifies your application to the Weemo cloud, and also defines a namespace of User-IDs (UIDs).  Two users can communicate with Weemo if they are using applications that share the same AppID.

##### User Identifier (UID)

A UID is the character string used to identify a user to the Weemo cloud. It is the way an endpoint is named for setting up a call.  A UID must be from 6 to 90 characters in length and should not include
spaces or unusual punctuation, more details [here](https://github.com/weemo/Weemo.js/wiki/Weemo-Naming-Rules).

The form of the UID used is what is most natural in your system, and for many systems that will be an email address or login name.  Weemo will use the UID to auto-provision your user in our cloud.

##### Weemo Display Name

A Display Name is the preferred long form of user's name.  It is used for display purposes only and is not used in determining how calls are connected.  

##### POC  (Proof-of-Concept) Mode

When you begin developing your app, you will be granted a "POC" AppID for developing your proof-of-concept app or website.  When using a POC-mode AppID, the UIDs used in your app are not validated against an authority.  This makes it possible to test your app with "made-up" UIDs and Display Names.

When you transition to production mode, Weemo assists you in implementing an authorization policy, and enforces UID validation.

##### Weemo Type

This describes the type of the Weemo User during the initialization of the Weemo object.

- internal - an internal user is one who is registered with your application.

- external - an external user is someone who is not registered to your application but is invited to be a video call attendee with one or more internal *or* external users.

##### Weemo Call Type

This describes the kind of video call you want established with ```createCall```.

- internal - use this type to create a one-to-one video call.

- attendee - use this type to create a multi-party video call as an attendee.

    A multi-party video call attendee can join a multi-party video call but is not granted privileges for controlling audio or video of other participants

- host - use this type to create a multi-party video call in which you are the host.

    A multi-party video call host is granted privileges to control the audio and video of the other participants.  A host can also lock the multi-party video call to prevent others from joining.

## Make a call using a Weemo real-time client

For each real-time client that Weemo supports, you can initiate a call between two devices using the same real-time client by setting the same ```AppId``` and providing a ```UID``` and ```display name``` the following links describe how to :

- iOS - sdk_helper - [How to use](https://github.com/weemo/iOS-SDK_beta/blob/master/sdk_helper_Adv/README.md#using-the-helper-application)
- Android - sdk_helper - [How to use](https://github.com/weemo/Android-SDK_beta#using-the-helper-application)
- Phonegap - sdk_helper - [How to use Cordova](https://github.com/weemo/Phonegap-SDK_Beta/blob/master/Weemo-Helper-Cordova/README.md#how-to-use-the-weemo-helper-for-cordova) | [How to use PhoneGap](https://github.com/weemo/Phonegap-SDK_Beta/blob/master/Weemo-Helper-Phonegap/README.md#how-to-use-the-weemo-helper-for-phonegap)
- JavaScript- API example  - [How to use](/examples/README.md#how-to-use-the-examples) | [How to deploy](/examples/README.md#how-to-deploy-the-examples)

## Make a call between different Weemo real-time clients

In order to make a call between different Weemo real-time clients, the only thing you must do is to make sure that each application shares the same AppID. Follow the instructions above to setup the ```AppID``` and provide a ```UID``` and ```display name``` for each user. No matter which real-time client is used each user will be reachable by their UID.