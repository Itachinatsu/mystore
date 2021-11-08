Xvfb :1 -screen 0 1280x800x24 &
export DISPLAY=:1
npx cypress verify
npx cypress run