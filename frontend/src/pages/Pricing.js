import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

function Pricing() {
  const plans = [
    {
      title: 'Basic',
      price: 'Free',
      features: [
        'Up to 10 images per day',
        'Basic compression',
        'Standard quality',
        'Email support'
      ]
    },
    {
      title: 'Pro',
      price: '$9.99/month',
      features: [
        'Unlimited images',
        'Advanced compression',
        'High quality',
        'Priority support',
        'Custom settings'
      ],
      popular: true
    },
    {
      title: 'Enterprise',
      price: '$29.99/month',
      features: [
        'Unlimited images',
        'Premium compression',
        'Highest quality',
        '24/7 support',
        'API access',
        'Custom solutions'
      ]
    }
  ];

  const handleSubscribe = (plan) => {
    // Implement payment gateway integration here
    console.log('Subscribing to plan:', plan);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Choose Your Plan</h1>
      <Row className="g-4">
        {plans.map((plan, index) => (
          <Col key={index} md={4}>
            <Card className={`h-100 pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <Card.Header className="text-center">
                <h2>{plan.title}</h2>
                <h3 className="price">{plan.price}</h3>
              </Card.Header>
              <Card.Body>
                <ul className="feature-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'warning' : 'primary'}
                  className="w-100 mt-3"
                  onClick={() => handleSubscribe(plan.title)}
                >
                  Subscribe Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Pricing; 