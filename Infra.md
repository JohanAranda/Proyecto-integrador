# Infraestructura

![image](https://gl.deitech.online/ctd/proyecto-integrador-0522/0621-c2/grupo-02/uploads/efff8b9ac22fcaf54198d38cbeb4cc92/image.png)

## Componentes

### VPC
> Referencia: [Amazon Virtual Private Cloud](https://aws.amazon.com/es/vpc/)

Es la red de AWS que vamos a usar para desplegar nuestros servicios, la misma provee seguridad para los componentes y accesibilidad para los clientes. En nuestra VPC vamos a tener una subred publica en donde vamos a alojar una instancia de EC2 y otra red privada en donde vamos a alojar nuestra base de datos (RDS).

#### Internet gateway
Es el componente de la VPC que nos permite acceder de manera externa a los recursos de AWS, en este caso a nuestra web en la instancia de EC2.

#### NAT gateway
Es el componente de la VPC que nos permite conectar componentes de nuestra subred publica con componentes de la subred privada.

### EC2
> Referencia: [Amazon Elastic Compute Cloud](https://aws.amazon.com/es/ec2/)

En este servicio vamos a desplegar nuestro backend y frontend. Debe estar en una subred publica ya que los clientes van a aceder a la web alojada aquí.

### RDS
> Referencia: [Amazon Relational Database Service](https://aws.amazon.com/es/rds/)

Es este servicio vamos a desplegar nuestra base de datos. Debe estar en una subred privada ya que la misma solo debe ser accedida por el backend de nuestra applicación.

## Referencias

- Conexión a Internet mediante una puerta de enlace de Internet. [link](https://docs.aws.amazon.com/es_es/vpc/latest/userguide/VPC_Internet_Gateway.html)
