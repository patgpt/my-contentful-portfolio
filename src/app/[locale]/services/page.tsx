const ServicesPage = async ({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) => {
  const locale = (await params).locale;
  return <div>{locale}</div>;
};

export default ServicesPage;
