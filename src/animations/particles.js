function normalPool(o) {
  var r = 0;
  do {
    var a = Math.round(normal({ mean: o.mean, dev: o.dev }));
    if (a < o.pool.length && a >= 0) return o.pool[a];
    r++;
  } while (r < 100);
}

function randomNormal(o) {
  if (
    ((o = Object.assign(
      {
        mean: 0,
        dev: 1,
        pool: [],
      },
      o
    )),
    Array.isArray(o.pool) && o.pool.length > 0)
  )
    return normalPool(o);
  var r,
    a,
    n,
    e,
    l = o.mean,
    t = o.dev;
  do {
    r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n;
  } while (r >= 1);
  return (e = a * Math.sqrt((-2 * Math.log(r)) / r)), t * e + l;
}

const NUM_PARTICLES = 400;
const PARTICLE_SIZE = 0.5; // View heights
const SPEED = 40000; // Milliseconds

let particles = [];

function rand(low, high) {
  return Math.random() * (high - low) + low;
}

function createParticle(canvas) {
  // PURPLE
  // const colour = {
  //   r: 124,
  //   g: randomNormal({mean: 58, dev: 20}),
  //   b: 237,
  //   a: rand(0, 1),
  // };
  const colour = {
    r: 196,
    g: randomNormal({ mean: 181, dev: 20 }),
    b: 253,
    a: rand(0, 1),
  };
  return {
    x: -2,
    y: -2,
    diameter: Math.max(0, randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
    duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
    amplitude: randomNormal({ mean: 16, dev: 2 }),
    offsetY: randomNormal({ mean: 0, dev: 10 }),
    arc: Math.PI * 2,
    startTime: performance.now() - rand(0, SPEED),
    colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
  };
}

function moveParticle(particle, canvas, time) {
  const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
  return {
    ...particle,
    x: progress,
    y: Math.sin(progress * particle.arc) * particle.amplitude + particle.offsetY,
  };
}

function drawParticle(particle, canvas, ctx) {
  const vh = canvas.height / 100;

  ctx.fillStyle = particle.colour;
  ctx.beginPath();
  ctx.ellipse(
    particle.x * canvas.width,
    particle.y * vh + canvas.height / 2,
    particle.diameter * vh,
    particle.diameter * vh,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function draw(time, canvas, ctx) {
  // Move particles
  particles.forEach((particle, index) => {
    particles[index] = moveParticle(particle, canvas, time);
  });

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the particles
  particles.forEach(particle => {
    drawParticle(particle, canvas, ctx);
  });

  // Schedule next frame
  requestAnimationFrame(time => draw(time, canvas, ctx));
}

function initializeCanvas(canvas) {
  if (!canvas) {
    return;
  }

  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  let ctx = canvas.getContext('2d');

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
  });

  return ctx;
}

function startParticlesAnimation(canvas) {
  if (!canvas) {
    return;
  }

  const ctx = initializeCanvas(canvas);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(createParticle(canvas));
  }

  requestAnimationFrame(time => {
    draw(time, canvas, ctx);
  });
}

export default startParticlesAnimation;
