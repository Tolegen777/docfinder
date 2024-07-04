scp -r .next/static/ ubuntu@185.4.180.16:~/docfinder/.next/static/
scp -r .next/standalone/ ubuntu@185.4.180.16:~/docfinder/.next/standalone/
ssh ubuntu@185.4.180.16 ~/docfinder/run.sh
