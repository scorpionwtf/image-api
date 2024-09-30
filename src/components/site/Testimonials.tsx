const Testimonials: React.FC = () => {
    return (
<section className="testimonials py-10 px-2 bg-white">
  <h2 className="text-5xl font-bold text-center mb-8">What Our Users Say</h2>
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
    <p lang="fr" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "Incroyable service d'agrandissement d'images avec IA!"
    </p>
    <p lang="es" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "¡Excelente herramienta para mejorar imágenes!"
    </p>
    <p lang="pt" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "Serviço impressionante para aumentar imagens!"
    </p>
    <p lang="zh" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "非常棒的AI图像放大服务！"
    </p>
    {/* New English reviews */}
    <p lang="en" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "This tool has completely changed how I work with images. Highly recommended!"
    </p>
    <p lang="en" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "Incredible quality and speed. I can't believe how easy it is to enhance my photos now!"
    </p>
    <p lang="en" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "The AI is so good, it's like magic! My images have never looked better."
    </p>
    <p lang="en" className="text-lg rounded-lg bg-gradient-to-br from-white to-slate-200 p-4 text-center shadow-lg">
      "I was skeptical at first, but this service exceeded my expectations. A must-have for designers!"
    </p>
  </div>
</section>


    );
  };
  
  export default Testimonials;
  