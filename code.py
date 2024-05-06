import network
import urequests
import utime
import ujson
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

userId = 1

ssid = 'Yohan'
password = 'ivwy1359'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://192.168.84.139:3000/users/"+ str(userId)+"/house"

leds = [PWM(Pin(13,mode=Pin.OUT)), PWM(Pin(14,mode=Pin.OUT)), PWM(Pin(15,mode=Pin.OUT))]
maisonsCouleur = {'Gryffindor' : [255, 0, 0], 'Slytherin' : [0, 255, 0], 'Ravenclaw' : [0, 0, 255], 'Hufflepuff' : [255, 255, 0], '' : [255, 255, 255]}

def clear():
    for led in leds:
        led.duty_u16(0)

def show(color):
    clear()
    for i in range(3):
        if color[i] == 0:
            leds[i].duty_u16(0)
        else:
            leds[i].duty_u16(color[i] * 256 - 2)


while not wlan.isconnected():
    print("pas connecté")
    utime.sleep(1)
    pass

while(True):
    print("connecté")
    try:
        r = urequests.get(url)
        json = r.json()
        show(maisonsCouleur[json["house"]])
        r.close()
        utime.sleep(1) 
    except Exception as e:
        print(e)