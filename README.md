# hflow-init

W projekcie znajduje się skopiowany [hyperflow-client](https://github.com/dice-cyfronet/hyperflow-client) z wprowadzonymi zmianami, pozwalającymi na uruchomienie infrastruktury w środowisku gridowym.

W celu skorzystania z systemu należy zainstalować wszystkie potrzebne zależności. W katalogu `scripts` znajduje się skrypt `install.sh` instalujący zależności. 

Aby można było korzystać z systemu należy wyeksportować `noda` do zmiennej środowiskowej PATH za pomocą polecenia:

`export PATH=$PATH:~/.hyperflow/node-v0.12.2-linux-x64/bin/`

Następnie w pliku `hflowc.config.js` znajdującym się w katalogu `hyperflow-client/lib` należy ustawić zmienną `scriptsdir`, czyli wskazać miejsce, w którym znajdują się skrypty. Domyślnym miejscem jest `~/.hyperflow/scripts_kopia/`.

Aby uruchomić infrastrukturę HyperFlow należy uchruchomić skrypt z klienta hyperfow-client:

`./hflowc setup`

Następnie należy odczekać na inforamcję zwrotną na jakim adresie został uruchomiony silnik HyperFlow np. `HyperFlow is running on http://10.10.2.173:44464`. W tym momencie nasze środowisko jest już gotowe i można uruchomić przepływ prac. Przy wykonywaniu komendy należy podać adres jaki otrzymaliśmy przy poleceniu `hflowc setup`. Przykładowe wykonanie workflowu split and gzip:

`./hflowc runwf http://10.10.2.173:44464 gzip3.json`
Po zakończeniu pracy możemy złożyć infrastrukturę za pomocą polecenia:

`./hflowc teardown`
