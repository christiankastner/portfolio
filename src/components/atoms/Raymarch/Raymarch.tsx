import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { initialize, types, useControls } from 'theatric';
import * as THREE from "three";
import raymarchState from "./raymarch-state.json";
import fragment from "./shaders/fragment.glsl?raw";
import vertex from "./shaders/vertex.glsl?raw";

initialize({
    state: raymarchState,
  }).then(() => {
  })


const Raymarch = () => {

    const {supershapeOne, supershapeTwo, fog} = useControls({
        supershapeOne: types.compound({
            m: types.number(1, {
                nudgeMultiplier: .1
            }),
            nOne: types.number(1, {
                nudgeMultiplier: .01
            }),
            nTwo : types.number(1, {
                nudgeMultiplier: .1
            }),
            nThree: types.number(1, {
                nudgeMultiplier: .1
            })
        }),
        supershapeTwo: types.compound({
            m: types.number(1, {
                nudgeMultiplier: .1
            }),
            nOne: types.number(1, {
                nudgeMultiplier: .1
            }),
            nTwo : types.number(1, {
                nudgeMultiplier: .1
            }),
            nThree: types.number(1, {
                nudgeMultiplier: .1
            })
        }),
        fog: types.compound({
            near: types.number(1, {
                nudgeMultiplier: .1
            }),
            far: types.number(1, {
                nudgeMultiplier: .1
            }),
        })
    })

    const shaderRef = useRef<THREE.ShaderMaterial>(null)
    const resolution = useRef(new THREE.Vector2(0,0))

    const uniforms = useMemo(() => {
        return {
            iTime: {value: 0},
            iResolution: {value: resolution.current},
            uSupershapeOneM: {value: supershapeOne.m},
            uSupershapeOneNOne: {value: supershapeOne.nOne},
            uSupershapeOneNTwo: {value: supershapeOne.nTwo},
            uSupershapeOneNThree: {value: supershapeOne.nThree},
            uSupershapeTwoM: {value: supershapeTwo.nTwo},
            uSupershapeTwoNOne: {value: supershapeTwo.m},
            uSupershapeTwoNTwo: {value: supershapeTwo.nOne},
            uSupershapeTwoNThree: {value: supershapeTwo.nThree},
            uFogNear: {value: fog.near},
            uFogFar: {value: fog.far}
        }
    }, [])

    useFrame(({clock, size}) => {
        if (shaderRef && shaderRef.current) {
            shaderRef.current.uniforms.iTime.value = clock.elapsedTime
            shaderRef.current.uniforms.uSupershapeOneM.value = supershapeOne.m
            shaderRef.current.uniforms.uSupershapeOneNOne.value = supershapeOne.nOne
            shaderRef.current.uniforms.uSupershapeOneNTwo.value = supershapeOne.nTwo
            shaderRef.current.uniforms.uSupershapeOneNThree.value = supershapeOne.nThree
            shaderRef.current.uniforms.uSupershapeTwoM.value = supershapeTwo.m
            shaderRef.current.uniforms.uSupershapeTwoNOne.value = supershapeTwo.nOne
            shaderRef.current.uniforms.uSupershapeTwoNTwo.value = supershapeTwo.nTwo
            shaderRef.current.uniforms.uSupershapeTwoNThree.value = supershapeTwo.nThree
            shaderRef.current.uniforms.uFogNear.value = fog.near
            shaderRef.current.uniforms.uFogFar.value = fog.far
            resolution.current.set(size.width, size.height)
        }
    })

    return (
    <>
        <mesh position={[0,0,-.1]}>
            <planeGeometry args={[12,6]}/>
            <shaderMaterial vertexShader={`varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                    }
                `}  
                fragmentShader={`
                    varying vec2 vUv;

                    void main() {
                        vec2 uv = vUv - .5;

                        uv.y /= 2.;
                        float gradientFactor = .65 - pow(length(uv), .5);

                        vec3 bgColor = mix(vec3(.21), vec3(.75), gradientFactor);

                        if (length(uv) - .1 < .001 && length(uv) - .1 > - .001) {
                            bgColor *= 1.15;
                        }
                        if (length(uv) - .3 < .001 && length(uv) - .3 > - .001) {
                            bgColor *= 1.15;
                        }

                        if (length(uv) - .45 < .001 && length(uv) - .45 > - .001) {
                            bgColor *= 1.15;
                        }

                        if (length(uv) - .5 < .001 && length(uv) - .5 > - .001) {
                            bgColor *= 1.15;
                        }
                         
                        gl_FragColor = vec4(bgColor, 1.);
                    }
                `}/>
        </mesh>
        <mesh rotation={[0,0,Math.PI/2]} >
            <planeGeometry args={[6,6]} />
            <shaderMaterial 
                ref={shaderRef}
                fragmentShader={fragment} 
                vertexShader={vertex} 
                uniforms={uniforms}
                transparent/>
        </mesh>
    </>
    );
}
 
export default Raymarch;
