# hflow-init
HyperFlow initialization

Aby uruchomić infrastrukturę HyperFlow należy uchruchomić skrypt hyperflow_pilot_job.sh podając jako pierwszy argument wywołania walltime np. 00:10:00, natomiast jako drugi argument wywołąnia skrypt inicjalizujący kolejkę rabbitmq:

./hyperflow_pilot_job.sh 00:10:00 init_amqp.sh

Należy odczekać, aż kolejka zeusowa uruchomi nasz skrypt, czyli status zadania będzie runnig, a następnie uruchomić kolejne skrypty przyjmujące jako pierwszy argument walltime, natomiast jako drugi argument skrypt init_executor.sh, który uruchamia executora oraz run_ellipsoids.sh który wykona przepływ amqpwf.json znajdujący się mgr/ellipsoids/js/. Przepływ można wygenerować tak jak to jest opisane tutaj https://github.com/malawski/ellipsoids. Poniżej znajdują się komendy do wykonania:

./hyperflow_pilot_job.sh 00:05:00 init_executor.sh
./hyperflow_pilot_job.sh 00:05:00 run_ellipsoids.sh
