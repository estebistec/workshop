# Introduction
- What makes node possible. (v8, libuv)
- Why use node?
- When you shouldn't use node.
- The REPL
	- Show off the process global object
- Running scripts with node
- Example of evented model
	- Compare to how other languages might handle waiting on a response from the network or db. Highlight that node is idle while waiting for callback and frees up other event handlers to do work.
	- The program exits when no more callbacks!
- Simple webserver
	- Hello world
	- Connection: keep-alive
	- Transfer-Encoding: chunked -> Allows for streaming (Show an example of how the streaming is possible in the request handler)
	- Show apache bench with -n 100 -c 100 to simulate 100 concurrent connections (show off the time it took)
- *Interactive Demo* create a simple chat server encourage others to connect

#Modules and NPM

#Event Emitters

#Streams

#File System

#Child Process

#Domains?