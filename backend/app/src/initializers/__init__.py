import glob
import importlib
from os.path import dirname, isfile, basename

from fastapi import FastAPI


def exec_initializers(app: FastAPI):
    py_files = glob.glob(dirname(__file__) + "/*.py")
    for f in py_files:
        if isfile(f) and not f.endswith('__init__.py'):
            module_name = basename(f)[:-3]
            module_path = '%s.%s' % (__package__, module_name)
            module = importlib.import_module(module_path)
            if hasattr(module, 'init'):
                func = getattr(module, 'init')
                func(app)
