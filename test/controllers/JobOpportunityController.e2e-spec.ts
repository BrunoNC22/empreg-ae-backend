import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import * as request from 'supertest'
import { JobOpportunityService } from '../../src/application/services/JobOpportiunity.service'

describe('JobOpportunityController', () => {
  let app: INestApplication
  const jobOpportunityService = {
    getJobOpportunities: (jobopportunityId: string) => {
      return []
    },

    createJobOpportunity: (createJobopportunityDto: any) => {
      return createJobopportunityDto
    },
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JobOpportunityService)
      .useValue(jobOpportunityService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('/job-opportunities (GET)', () => {
    const JOB_OPPORTUNITY_BASE_URL = '/job-opportunities'

    it('should return a response with status code 200', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())

      // When
      const response = await appHttpServer.get(JOB_OPPORTUNITY_BASE_URL)

      // Then
      expect(response.status).toBe(200)
    })

    it('should return a response body that is an array', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())

      // When
      const response = await appHttpServer.get(JOB_OPPORTUNITY_BASE_URL)

      // Then
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('/job-opportunities (POST)', () => {
    const JOB_OPPORTUNITY_BASE_URL = '/job-opportunities'

    const validJobOpportunity = {
      companyId: 'company123',
      location: { state: 'CA', city: 'San Francisco' },
      title: 'Software Engineer',
      type: 'clt',
      salary: 120000,
      benefits: ['Health insurance', 'Meal voucher'],
      requirements: ['Knowledge in Python', 'Sales experience'],
      description: 'Job description',
      publicationDate: '2024-08-01T00:00:00Z',
      applicationDeadline: '2024-08-31T23:59:59Z',
      workSchedule: 'full-time',
      workMode: 'onsite',
      sector: 'IT',
      level: 'mid',
      contact: { email: 'contact@example.com', phone: '123-456-7890' },
      desiredSkills: ['Teamwork', 'Problem-solving'],
      education: "Bachelor's degree",
      experience: '2 years',
    }

    it('should return a response with status code 201 when valid data is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(validJobOpportunity)

      // Then
      expect(response.status).toBe(201)
    })

    it('should return the created job opportunity in the response body when valid data is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(validJobOpportunity)

      // Then
      expect(response.body).toEqual(
        expect.objectContaining(validJobOpportunity),
      )
    })

    it('should return a response with status code 400 when a request with empty companyId is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, companyId: '' }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid location is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, location: null }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with empty title is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, title: '' }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid type is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        type: 'invalidType',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with non-numeric salary is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        salary: 'notANumber',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with non-array benefits is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        benefits: 'notAnArray',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with non-array requirements is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        requirements: 'notAnArray',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with empty description is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, description: '' }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid publicationDate is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        publicationDate: 'invalidDate',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid applicationDeadline is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        applicationDeadline: 'invalidDate',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid workSchedule is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        workSchedule: 'invalidSchedule',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid workMode is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        workMode: 'invalidMode',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with empty sector is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, sector: '' }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid level is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        level: 'invalidLevel',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with invalid contact is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, contact: null }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with non-array desiredSkills is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        desiredSkills: 'notAnArray',
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with empty education is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = { ...validJobOpportunity, education: '' }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })

    it('should return a response with status code 400 when a request with non-string experience is passed', async () => {
      // Given
      const appHttpServer = request(app.getHttpServer())
      const invalidJobOpportunity = {
        ...validJobOpportunity,
        experience: 12345,
      }

      // When
      const response = await appHttpServer
        .post(JOB_OPPORTUNITY_BASE_URL)
        .send(invalidJobOpportunity)

      // Then
      expect(response.status).toBe(400)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
