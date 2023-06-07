-- CreateTable
CREATE TABLE "business_organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "business_organization_id" UUID NOT NULL,
    "feedback" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "environmental_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_organization_id" UUID NOT NULL,
    "carbon_emissions" INTEGER NOT NULL,
    "energy_consumption" INTEGER NOT NULL,
    "waste_production" INTEGER NOT NULL,
    "recycling_rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "environmental_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "resource_type" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sustainability_goal" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_organization_id" UUID NOT NULL,
    "target_carbon_emissions" INTEGER NOT NULL,
    "target_energy_consumption" INTEGER NOT NULL,
    "target_waste_reduction" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sustainability_goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "business_organization" ADD CONSTRAINT "business_organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_feedback" ADD CONSTRAINT "employee_feedback_business_organization_id_fkey" FOREIGN KEY ("business_organization_id") REFERENCES "business_organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_feedback" ADD CONSTRAINT "employee_feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "environmental_data" ADD CONSTRAINT "environmental_data_business_organization_id_fkey" FOREIGN KEY ("business_organization_id") REFERENCES "business_organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sustainability_goal" ADD CONSTRAINT "sustainability_goal_business_organization_id_fkey" FOREIGN KEY ("business_organization_id") REFERENCES "business_organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

