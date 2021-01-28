import glob
import logging.config

import yaml
from fastapi import FastAPI


def init(app: FastAPI):
    yaml_files = glob.glob("resources/config/logging/*.yaml")
    for file in yaml_files:
        with open(file, 'r') as f:
            dict_conf = yaml.load(f, yaml.SafeLoader)
        logging.config.dictConfig(dict_conf)
