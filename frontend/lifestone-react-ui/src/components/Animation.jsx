import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Animation = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight - 120);
    containerRef.current.appendChild(renderer.domElement);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Particle geometry
    const distance = Math.min(150, window.innerWidth / 4);
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1600; i++) {
      // const vertex = new THREE.Vector3();
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2)); 
      const phi = THREE.MathUtils.randFloatSpread(360);
      vertices.push(distance * Math.sin(theta) * Math.cos(phi),distance * Math.sin(theta) * Math.sin(phi), distance * Math.cos(theta));
    //   vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    //   vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    //   vertex.z = distance * Math.cos(theta);
      // vertices.push(vertex);
      // geometry.vertices.push(vertex);
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff44ff, size: 2}));
    particles.boundingSphere = 50;

    // Groups for transformations
    const renderingParent = new THREE.Group();
    renderingParent.add(particles);
    const resizeContainer = new THREE.Group();
    resizeContainer.add(renderingParent);
    scene.add(resizeContainer);

    // Camera position
    camera.position.z = 400;

    // Animate and render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Mouse move event handling
    let myTween;
    const handleMouseMove = (event) => {
      if (myTween) {
        myTween.kill();
      }
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      myTween = gsap.to(particles.rotation, {duration: 0.1, x: mouseY * -1, y: mouseX});
    }
    window.addEventListener('mousemove', handleMouseMove);

    // Scaling animation
    const animProps = {scale: 1, xRot: 0, yRot: 0};
    gsap.to(animProps, {
        duration: 10,
        scale: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine",
        onUpdate: () => {
        renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
        });
        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            yoyo: true,
            ease: "none",
            onUpdate: () => {
              renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
            }
          });
          
          // Clean up on unmount
          return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.ticker.remove(animate);
            containerRef.current.removeChild(renderer.domElement);
          }
        }, []);
        return <div ref={containerRef} />;
        }
        
export default Animation;
