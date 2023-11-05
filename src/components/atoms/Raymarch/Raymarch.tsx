import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
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

    const {supershapeOne, supershapeTwo} = useControls({
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
        })
    })

    const shaderRef = useRef()
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
            uSupershapeTwoNThree: {value: supershapeTwo.nThree}
        }
    }, [])

    useFrame(({clock, size}) => {
        if (shaderRef) {
            shaderRef.current.uniforms.iTime.value = clock.elapsedTime
            shaderRef.current.uniforms.uSupershapeOneM.value = supershapeOne.m
            shaderRef.current.uniforms.uSupershapeOneNOne.value = supershapeOne.nOne
            shaderRef.current.uniforms.uSupershapeOneNTwo.value = supershapeOne.nTwo
            shaderRef.current.uniforms.uSupershapeOneNThree.value = supershapeOne.nThree
            shaderRef.current.uniforms.uSupershapeTwoM.value = supershapeTwo.m
            shaderRef.current.uniforms.uSupershapeTwoNOne.value = supershapeTwo.nOne
            shaderRef.current.uniforms.uSupershapeTwoNTwo.value = supershapeTwo.nTwo
            shaderRef.current.uniforms.uSupershapeTwoNThree.value = supershapeTwo.nThree
            resolution.current.set(size.width, size.height)
        }
    })

    return <mesh>
        <planeGeometry args={[6,6]} />
        <shaderMaterial 
        ref={shaderRef}
        fragmentShader={fragment} 
        vertexShader={vertex} 
        uniforms={uniforms}
        transparent/>
    </mesh>;
}
 
export default Raymarch;
