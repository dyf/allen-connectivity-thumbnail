allensdk-connectivity-thumbnail
===============================

This is a [lightning-viz](http://lightning-viz.org/) plugin for creating a 3D visualization of the projection density for an experiment in the [Allen Mouse Brain Connectivity Atlas](http://connectivity.brain-map.org).

installation
------------

    $ git clone https://github.com/dyf/allensdk-connectivity-thumbnail.git
    $ cd allensdk-connectivity-thumbnail
    $ npm link .

Then you need to import the visualization into a lightning server.

    $ cd /path/to/lightning
    $ npm start

Open http://localhost:3000, import the visualization as a local NPM module.

usage
-----

If you are inside an IPython/Jupyter notebook, you can:

    > from lightning import Lightning 
    > lgn = Lightning(ipython=True)
    > experiment_id = 113095845
    > lgn.plot(type='allensdk-connectivity-thumbnail', data={'experiment_id': [experiment_id]})

