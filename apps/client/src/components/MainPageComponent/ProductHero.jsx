import Button from './MainModule/ProducHeroBtn';
import Typography from './MainModule/Typography';
import ProductHeroLayout from './MainModule/ProductHeroLayout';

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

export default function ProductHero({ image, title, description, isVideo }) {
  console.log('메인 타이틀', title)

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${image})`,
        backgroundColor: '#7fc7d9', 
        backgroundPosition: 'center',
        height : '100vh',
      }}
    >
      {isVideo ? (<video
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          autoPlay
          loop
          muted
          src={image}
        />) : (<img
        style={{ display: 'none', height:'100%' }}
        src={backgroundImage}
        alt="increase priority"
      />)}
      
      <Typography color="inherit" align="center" variant="h2">
        {title}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        
      >
        {description}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        체험하기
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}