import "./styles/style.scss";
import "./styles/reset.scss";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;

    const image = new Image();
    image.src = "./assets/player.png";

    image.onload = () => {
      this.image = image;
      this.width = 80;
      this.height = 80;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };
  }

  drawPlayer() {
    ctx.save();
    ctx.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    );

    ctx.rotate(this.rotation);

    ctx.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    );

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    ctx.restore();
  }

  update() {
    if (this.image) {
      this.drawPlayer();
      this.position.x += this.velocity.x;
    }
  }
}

class Bullets {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  drawBullet() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "tomato";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.drawBullet();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Bird {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = "./assets/bird.png";

    image.onload = () => {
      const scale = 1;
      this.image = image;
      this.width = 40;
      this.height = 40;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  drawPlayer() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({ velocity }) {
    if (this.image) {
      this.drawPlayer();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 3,
      y: 0,
    };

    this.birds = [];

    const rows = Math.floor(Math.random() * 5 + 1);
    const columns = Math.floor(Math.random() * 10 + 5);

    this.width = columns * 60;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.birds.push(
          new Bird({
            position: {
              x: x * 60,
              y: y * 60,
            },
          })
        );
      }
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 30;
    }
  }
}

const player = new Player();
const bullets = [];
const grids = [new Grid()];

let keysPressed = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  bullets.forEach((bullet, index) => {
    if (bullet.position.y + bullet.radius <= 0) {
      setTimeout(() => {
        bullets.splice(index, 1);
      }, 0);
    } else {
      bullet.update();
    }
  });

  grids.forEach((grid) => {
    grid.update();
    grid.birds.forEach((bird, index) => {
      bird.update({ velocity: grid.velocity });

      bullets.forEach((bullet, i) => {
        if (
          bullet.position.y - bullet.radius <= bird.position.y + bird.height &&
          bullet.position.x + bullet.radius >= bird.position.x &&
          bullet.position.x - bullet.radius <= bird.position.x + bird.width &&
          bullet.position.y + bullet.radius >= bird.position.y
        ) {
          setTimeout(() => {
            const birdFound = grid.birds.find((bird2) => {
              return bird2 === bird;
            });

            const bulletFound = bullets.find((bullet2) => {
              return bullet2 === bullet;
            });

            if (birdFound && bulletFound) {
              grid.birds.splice(index, 1);
              bullets.splice(i, 1);
            }
          }, 0);
        }
      });
    });
  });

  if (keysPressed.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.rotation = -0.15;
  } else if (
    keysPressed.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 5;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
      keysPressed.a.pressed = true;
      break;
    case "d":
      keysPressed.d.pressed = true;
      break;
    case " ":
      keysPressed.space.pressed = true;
      bullets.push(
        new Bullets({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -15,
          },
        })
      );
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keysPressed.a.pressed = false;
      break;
    case "d":
      keysPressed.d.pressed = false;
      break;
    case " ":
      keysPressed.space.pressed = false;
      break;
  }
});
