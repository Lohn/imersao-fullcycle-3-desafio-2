import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateRouteDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    title: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    startPosition: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    endPosition: string;
}
