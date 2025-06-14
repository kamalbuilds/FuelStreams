
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import FloatingAsset from './FloatingAsset';

const Scene3D = () => {
  const assets = [
    { position: [-2, 0, 0] as [number, number, number], color: '#3b82f6', label: 'Real Estate', value: '$2.4M' },
    { position: [0, 0, 0] as [number, number, number], color: '#8b5cf6', label: 'Commodities', value: '$1.8M' },
    { position: [2, 0, 0] as [number, number, number], color: '#06b6d4', label: 'Bonds', value: '$3.2M' },
    { position: [0, 2, 0] as [number, number, number], color: '#10b981', label: 'Private Credit', value: '$1.5M' },
  ];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          {assets.map((asset, index) => (
            <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <FloatingAsset {...asset} />
            </Float>
          ))}
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
