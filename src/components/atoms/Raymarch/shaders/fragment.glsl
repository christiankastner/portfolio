uniform float iTime;
uniform vec2 iResolution;
uniform float uSupershapeOneM;
uniform float uSupershapeOneNOne;
uniform float uSupershapeOneNTwo;
uniform float uSupershapeOneNThree;
uniform float uSupershapeTwoM;
uniform float uSupershapeTwoNOne;
uniform float uSupershapeTwoNTwo;
uniform float uSupershapeTwoNThree;
uniform float uFogNear;
uniform float uFogFar;

varying vec2 vUv;


#define RAYMARCH_MAX_STEPS 		512
#define RAYMARCH_MAX_DIST 		1000.0
#define RAYMARCH_SURFACE_DIST 	0.000001


vec2 getAngle(vec3 p) {
    float theta = asin(p.z / length(p));
    float phi = atan(p.y, p.x);
    return vec2(theta, phi);
}

float supershape(float theta, float m, float n1, float n2, float n3, float a, float b) {
  float t1 = abs((1./a)*cos(m * theta / 4.0));
  t1 = pow(t1, n2);

  float t2 = abs((1./b)*sin(m * theta / 4.0));
  t2 = pow(t2, n3);

  float t3 = t1 + t2;
  float r = pow(t3, -1.0 / n1);

  return r;
}

float getDist(vec3 p) {
	vec2 angle = getAngle(p);
    
    angle.x += 2.5 * sin(iTime * .25);
    angle.y += 2.5 * sin(iTime * .1);
    
    float r1 = supershape(angle.x,
                          uSupershapeOneM + cos(iTime * .1) * 5.,
                          uSupershapeOneNOne,
                          uSupershapeOneNTwo,
                          uSupershapeOneNThree,
                          1.,
                          1.);
    
    float r2 = supershape(angle.y, 
                          uSupershapeTwoM + sin(iTime * .35) * 20., 
                          uSupershapeTwoNOne,
                          uSupershapeTwoNTwo,
                          uSupershapeTwoNThree,
                          1.,
                          1.);
    
    vec3 f = vec3(r1 * sin(angle.x) * r2 * cos(angle.y),
                  r1 * sin(angle.x) * r2 * sin(angle.y),
                  r2 * cos(angle.x));
    
    return (length(p) - length(f)) * 0.2;
}

// Thanks to https://www.youtube.com/watch?v=PGtv-dBi2wE for the RayMarching for dummies tutorial
float rayMarch(in vec3 ro, in vec3 rd, out int mr) {
	float dO = 0.0;
    
    for (int i = 0; i < RAYMARCH_MAX_STEPS; i++) {
		vec3 p = ro + rd * dO;
        float dS = getDist(p);
        dO += dS;
        if (dO > RAYMARCH_MAX_DIST) break;
        if (dS < RAYMARCH_SURFACE_DIST) {
            mr = 1;
            break;
        }
    }
    
    return dO;
}

float rayMarch(in vec3 ro, in vec3 rd) {
	float dO = 0.0;
    
    for (int i = 0; i < RAYMARCH_MAX_STEPS; i++) {
		vec3 p = ro + rd * dO;
        float dS = getDist(p);
        dO += dS;
        if (dO > RAYMARCH_MAX_DIST) break;
        if (dS < RAYMARCH_SURFACE_DIST) {
            break;
        }
    }
    
    return dO;
}

vec3 getNormal(vec3 p) {
	float d = getDist(p);
    vec2 e = vec2(0.01, 0.0);
    
    vec3 n = d - vec3(
        getDist(p - e.xyy),
        getDist(p - e.yxy),
        getDist(p - e.yyx));
    
    return normalize(n);
}

vec3 getDiff(vec3 p, vec3 rd) {
    vec3 n = getNormal(p);
    return reflect(rd, n);
}

// From https://www.shadertoy.com/view/lsKcDD
// https://iquilezles.org/articles/rmshadows
float shadowMarch( vec3 ro, vec3 rd ) {
	float dO = 0.01;
    float res = 1.0;
    
    for (int i = 0; i < 64; i++) {
		float h = getDist( ro + rd * dO );

        res = min( res, 10.0 * h / dO );  
        dO += h;
        
        if( res < 0.0001 || dO > RAYMARCH_MAX_DIST ) break;
    }
    
    return res;
}

void main() {
    
    vec2 uv = vUv - .5;
    
    float an = -iTime * 0.1;
    
    // Camera matrix and movement from https://www.shadertoy.com/view/ldl3Dl
    float cd = 6.5;
    vec3 ro = vec3( 6., 6., 0.);
    vec3 ta = vec3( 0.0, 0.0, 0.0 );
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
    vec3 rd = normalize( uv.x*uu + uv.y*vv + 2.0*ww );
    
    int mr = 0;
    float d = rayMarch(ro, rd, mr);

    float gradientFactor = .65 - pow(length(uv), .5);

    vec3 bgColor = mix(vec3(.3), vec3(.75), gradientFactor);

    vec4 col = vec4(bgColor, 0.);

    if (mr == 1) {
        vec3 p = ro + rd * d;
    	vec3 dif = getDiff(p, rd);
    	col.rgb = vec3(.8);
      	vec3 lightPos = normalize(vec3(0., -10.0, 10.0));
     	vec3 l = normalize(lightPos - p);
      	vec3 n = getNormal(p);
    	float s = 0.7 + 0.3 *dot(n, l);
        float fogFactor = (uFogFar - distance(ro, p))/(uFogFar - uFogNear);
        vec3 fogColor = vec3(0.,0.,0.);
        vec3 diffuseColor = vec3(1.,.996,.984);
    	col.rgb *= mix(bgColor, s*diffuseColor, fogFactor);
        col.a = 1.;
    }

     // Calculate noise and sample texture
    float mdf = 0.05; // increase for noise amount 
    float noise = (fract(sin(dot(vec2(uv.x + iTime, uv.y), vec2(12.9898,78.233)*2.0)) * 43758.5453));
    
    mdf *= sin(iTime) + 1.0; // animate the effect's strength

    col.rgb = col.rgb - noise * mdf;
    
    gl_FragColor = col;
}
