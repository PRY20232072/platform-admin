interface HeadingProps {
  title: string;
  description: string;
  patient_id: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description , patient_id}) => {
  return (
    <div className="h-32 px-[170px] py-10 flex-col justify-start items-start gap-10 inline-flex">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mr-10">{description}</p>
      <p className="text-sm text-muted-foreground mr-10">{patient_id}</p>
    </div>
  );
};
