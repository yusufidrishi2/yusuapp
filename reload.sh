sudo systemctl disable yusuapp
sudo systemctl restart yusuapp
sudo systemctl daemon-reload
sudo systemctl enable yusuapp
#sudo systemctl status objtrack #to see the status, it should be in running
sudo systemctl restart nginx
