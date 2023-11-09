import { useFrame, useThree } from '@react-three/fiber';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { initialize, types, useControls } from 'theatric';
import * as THREE from "three";
import raymarchState from "./raymarch-state.json";
import fragment from "./shaders/fragment.glsl?raw";
import BGFragment from "./shaders/bgfragment.glsl?raw";
import vertex from "./shaders/vertex.glsl?raw";

initialize({
    state: raymarchState,
  }).then(() => {
  })


const Raymarch = () => {
    const anchor = document.querySelector("#hero") as HTMLDivElement
    const group = useRef(null)
    const raymarch = useRef()
    const background = useRef()
    const backgroundShader = useRef()
    const aspect = useRef(1)

    useEffect(() => {
        if (anchor) {
            anchor.style['opacity'] = '0'
        }
    }, [])

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
    const {pointer} = useThree()

    const uniforms = useMemo(() => {
        return {
            iTime: { value: 0 },
            iResolution: {value: resolution.current},
            iMouse: {value: pointer},
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

    const bgUniforms = useMemo(() => {
        return {iAspect: {value: aspect.current}, iTime: {value: 0}}
    },[])

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
        if (backgroundShader && backgroundShader.current) {     
            backgroundShader.current.uniforms.iTime.value = clock.elapsedTime
            backgroundShader.current.uniforms.iAspect.value = aspect.current
        }
    })
    
    const handleResize = useCallback(() => {
        if (background.current && group.current && anchor) {
            const {height, width, top, left} = anchor.getBoundingClientRect()
            background.current.scale.set(width, height, 1)
            raymarch.current.scale.set(height, height, 1)
            const x = left - window.innerWidth / 2 + width/2
            const y = -top + window.innerHeight / 2 - height/2
            group.current.position.set(x,y,0)
            aspect.current = width/height
        }
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [background.current])

    return (
    <group ref={group}>
        <mesh position={[0,0,-.1]} ref={background}>
            <planeGeometry args={[1,1]} />
            <shaderMaterial ref={backgroundShader} uniforms={bgUniforms} vertexShader={vertex}  
                fragmentShader={BGFragment}/>
        </mesh>
        <mesh rotation={[0,0,Math.PI/2]} ref={raymarch} >
            <planeGeometry args={[1,1]} />
            <shaderMaterial 
                ref={shaderRef}
                fragmentShader={fragment} 
                vertexShader={vertex} 
                uniforms={uniforms}
                transparent/>
        </mesh>
    </group>
    );
}
 
export default Raymarch;
