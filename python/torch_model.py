import torch
import torch.nn as nn
import torch.nn.functional as F

class SkinNet(nn.Module):
    def __init__(self):
        super(SkinNet, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, 3)
        self.fc1 = nn.Linear(32 * 54 * 54, 64)
        self.fc2 = nn.Linear(64, 8)  # 8 disease classes

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # 224 -> 111
        x = self.pool(F.relu(self.conv2(x)))  # 109 -> 54
        x = x.view(-1, 32 * 54 * 54)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
