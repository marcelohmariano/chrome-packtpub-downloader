SHELL = /bin/sh

EXTENSION_ID ?=
CLIENT_ID ?=
CLIENT_SECRET ?=
REFRESH_TOKEN ?=

GITHUB_TOKEN ?=
GITHUB_REPO_OWNER ?=
GITHUB_REPO_NAME ?=
GITHUB_REPO_TAG ?=

extension_name := chrome-packtpub-downloader
extension_zip_package := $(extension_name).zip
extension_crx_package := $(extension_name).crx
extension_source_dir := extension

devenv := $(extension_name)
user := $(shell id -u):$(shell id -g)

define run
	docker run -it --rm -v "$(PWD)":/work -w /work --user="$(user)" $(devenv) $(1)
endef

all: devenv zip
clean: clean-zip
clean-all: clean clean-devenv
deploy: all deploy-to-webstore deploy-to-github

devenv:
	@if [ $(shell docker images -q $(devenv) | wc -l) -eq 0 ]; then \
		docker build --compress -t $(devenv) .; \
	fi

zip:
	@if [ ! -f "$(extension_zip_package)" ]; then \
		$(call run,zip -r -9 "$(extension_zip_package)" "$(extension_source_dir)"); \
	fi

clean-devenv:
	@docker rmi -f $(devenv) 2>/dev/null

clean-zip:
	@rm -rf "$(extension_zip_package)"
	@rm -rf "$(extension_crx_package)"

deploy-to-webstore:
	@$(call run,\
		webstore upload \
			--source "$(extension_zip_package)" \
			--extension-id "$(EXTENSION_ID)" \
			--client-id "$(CLIENT_ID)" \
			--client-secret "$(CLIENT_SECRET)" \
			--refresh-token "$(REFRESH_TOKEN)" \
			--auto-publish || true)

deploy-to-github: download-from-webstore
	@if [ $(shell stat -c '%s' "$(extension_crx_package)") -ne 0 ]; then \
		$(call run,\
			github-release upload \
				--token "$(GITHUB_TOKEN)" \
				--owner "$(GITHUB_REPO_OWNER)" \
				--repo "$(GITHUB_REPO_NAME)" \
				--tag "$(GITHUB_REPO_TAG)" \
				--draft true \
				"$(extension_crx_package)"); \
	fi

download-from-webstore:
	@$(call run,\
		download-crx \
			--url "https://chrome.google.com/webstore/detail/$(EXTENSION_ID)" \
			--name "$(extension_name)")