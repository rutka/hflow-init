# hflow-init

W projekcie znajduje się skopiowany [hyperflow-client](https://github.com/dice-cyfronet/hyperflow-client) z wprowadzonymi zmianami, pozwalającymi na uruchomienie infrastruktury w środowisku gridowym.

Aby uruchomić infrastrukturę HyperFlow należy uchruchomić skrypt z klienta hyperfow-client:

`./hflowc setup`

Następnie należy odczekać na inforamcję zwrotną na jakim adresie został uruchomiony silnik HyperFlow. W tym momencie nasze środowisko jest już gotowe i można uruchomić przepływ prac. Przy wykonywaniu komendy należy podać adres jaki otrzymaliśmy przy poleceniu `hflowc setup`. Przykładowe wykonanie workflowu split and gzip:

`./hflowc runwf http://10.10.2.173:44464 gzip3.json`

