include Makefile.inc

IMAGE = $(USER)/$(IMAGE)
VERSION ?= latest

.PHONY: docker build push push-version

docker: build push push-version

build:
	docker build --pull -t $(IMAGE) .

push:
	docker tag -f $(IMAGE) $(REGISTRY)/$(IMAGE):$(VERSION)
	docker push $(REGISTRY)/$(IMAGE):$(VERSION)

push-version:
	$(MAKE) docker-push -e VERSION=$(shell docker run --rm $(IMAGE) bin/www --version-short | sed "s/+/_/")
