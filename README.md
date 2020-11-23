# Setup

Install minikube as recommended.
Install istioctl as shown in getting started guide.

1. `minikube start`
2. `eval \$(minikube docker-env)`
3. `docker build -t server:latest ./server`
4. `minikube dashboard`
5. `istioctl install --set profile=demo -y`
6. `kubectl label namespace default istio-injection=enabled`
7. `sh apply.sh`

# While Running

- Connect to Pod:

  `kubectl exec -it -n default service-SOMEWEIRDID sh`

- Check connection to virtualservice / service:

  `curl service-feature-b`

- switch virtual service configuration:

  `kubectl apply -f virtualservice-no-routing.yml` vs. `kubectl apply -f virtualservice-with-routing.yml`

- To add dynamic route:

  `kubectl patch virtualservices.networking.istio.io service --type=json -p='[ { "op": "add", "path": "/spec/http/0", "value": { "name": "feature-a", "match": [ { "headers": { "X-QS": { "exact": "feature-a" } } } ], "route": [ { "destination": { "host": "service-feature-a.default.svc.cluster.local" } } ] } } ]'`

# Teardown

1. minikube stop
2. minikube delete

# Conclusion

If we want to implement a solution wich uses multiple feature pods an application of a whole config file will not be feasible.
A sample scenario where this might be needed, would be the deployment of unmerged feature branches.
A scenarios like this will require a patch of the virtual service with later cleanup by a circleci cronjob.
