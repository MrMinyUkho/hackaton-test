dock-build:
	docker build -t vite-nginx .
	docker stop my-vite-app || true
	docker rm my-vite-app || true
	docker run -d -p 8080:80 --name my-vite-app vite-nginx