sudo rm ./.git/hooks/pre-commit.sample
sudo cp ./scripts/pre-commit ./.git/hooks/pre-commit
sudo chmod +x ./.git/hooks/pre-commit