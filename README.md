# hflow-init
HyperFlow initialization

Aby uruchomić infrastrukturę HyperFlow należy uchruchomić skrypt z klienta hyperfow-client:

./hflowc setupgrid


Następnie należy odczekać, aż zadanie pilotażowe się wykona i zostaną nam przydzielone zasoby obliczeniowe. Oczekując można sprawdzić stan zadania pilotażowego za pomocą komendy:

./hflowc healthcheckgrid

Gdy status zadania będzie runnig oznacza to, że infrastruktura jest już gotowa. Można uruchomić kolejne polecenie uruchamiające executora:

./hflowc initexecutor

Przykładowe wykonanie workflowu split and gzip:

./hflowc runwf http://`cat ~/.hyperflow/ip`:44464 gzip3.json

