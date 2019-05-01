import numpy as np

from agent import W_SIZE

W_weights_matrix = np.memmap("W_weights_matrix", dtype='float32', mode='w+', shape=(W_SIZE))
W_weights_matrix[:] = np.zeros(W_SIZE)[:]
