varying vec2 vUv;
uniform float iAspect;
uniform float iTime;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

void main() {
    vec2 uv = vUv - .5;

    uv.y /= iAspect;
    float gradientFactor = .65 - pow(length(uv), .5);

    vec3 bgColor = mix(vec3(.21), vec3(.75), gradientFactor);

    if (length(uv) - .15 < .001 && length(uv) - .15 > - .001) {
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

    // Calculate noise and sample texture
    float mdf = 0.05; // increase for noise amount 
    float noise = (fract(sin(dot(vec2(uv.x, uv.y), vec2(12.9898,78.233)*2.0)) * 43758.5453));

    bgColor = bgColor - noise * mdf;

    gl_FragColor = vec4(bgColor, 1.);
}
