import serial
import time
import pathlib

workingPath = pathlib.Path(__file__).parent.absolute()

# Read data from serial port
serialPort = serial.Serial('COM6', 9600, timeout = 1)
while 1:
# while not serialPort.inWaiting():
        serialData = serialPort.readline()
        # check if data is valid
        try:
                file = open(str(workingPath) + "./value.txt", "w")
                file.write(serialData.decode('ascii'))
                file.close()
        except:
                file = open(str(workingPath) + "./log.txt", "a")
                file.write("Couldn't write to log")
                file.close()
                
                
