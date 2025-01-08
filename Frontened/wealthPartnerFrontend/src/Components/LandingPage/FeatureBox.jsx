import underline from '../../assets/underline.png'

export default function FeatureBox({ title, description, icon }) {
  return (
    <div className="landing-feature-box m-4 h-1/3 ">
      <div className="flex gap-4 flex-col content-between">
        <div className="flex gap-4 items-start">
          <i className={`${icon} ri-2x bg-secondary text-white rounded-md px-1`} ></i>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <img className="w-40" src={underline} alt="underline" />
          </div>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
