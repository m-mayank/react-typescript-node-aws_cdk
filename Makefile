SHEL := /bin/sh

#### Variable to be overrirdden
ifndef AWS_REGION
	export AWS_REGION := eu-west-1
endif

ifndef AUDIENCE
	export AUDIENCE := dev
endif

ifndef AWS_ACCOUNT
${error AWS_ACCOUNT not set}
endif

CDK_TOOLKIT_STACK_NAME := ${AUDIENCE}-cdk-toolkit
CDK_TOOLKIT_BUCKET_NAME := ${AWS_ACCOUNT}-${AUDIENCE}-cdk-stagging

#### CDK commands
cdk-bootstrap:
	cd infrastructure && \
		cdk bootstrap \
		--toolkit-stack-name ${CDK_TOOLKIT_STACK_NAME} \
		--toolkit-bucket-name ${CDK_TOOLKIT_BUCKET_NAME}

cdk-ls:
	cd infrastructure && cdk ls

cdk-synth: nuke-cdk
	cd infrastructure && cdk synth

cdk-diff:
	cd infrastructure && cdk diff

cdk-deploy: nuke-cdk cdk-bootstrap
	cd infrastructure && \
		cdk deploy '*' \
		--toolkit-stack-name ${CDK_TOOLKIT_STACK_NAME}

#### Stages of pipeline

nuke: nuke-node-modules nuke-artifacts nuke-cdk

nuke-cdk:
	find . -name "cdk.out" -exec rm -rf {} +

nuke-node-modules:
	find . -name node_modules -exec rm -rf {} +

nuke-artifacts:
	find . \( -name lib -o -name build -o -name dist \) -exec rm -rf {} +

install:
	npm run ci

compile:
	npm run compile

package:
	npm run package

start:
	npm run start

deploy: cdk-deploy